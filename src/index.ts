import * as fs from 'fs'
import * as path from 'path'
import { Client, Intents } from 'discord.js'
import type { Guild, Interaction } from 'discord.js'
import { TOKEN } from './secret'
import type MsgContext from './structure/MsgContext'
import type SlashCommand from './structure/SlashCommand'
import type UserContext from './structure/UserContext'
import type { ToCamel } from './type-util'

const intentFlags = Intents.FLAGS

const client = new Client({
	intents: [ intentFlags.GUILDS, intentFlags.GUILD_MESSAGES, ],
	allowedMentions: {
		repliedUser: false,
	},
})

const dirNames = [ 'msg-contexts', 'slash-commands', 'user-contexts' ] as const
const commands = dirNames.reduce(
	(obj, dirName) => {
		const commandsDirPath = path.join(__dirname, 'commands', dirName)
		return {
			...obj,
			[dirName.replace(/-([a-z])/g, (_, $1) => $1.toUpperCase()) as ToCamel<typeof dirName>]: fs.readdirSync(commandsDirPath).map(_path => require(path.join(commandsDirPath, _path)).default)
		}
	},
	{} as {
		msgContexts: Array<MsgContext>
		slashCommands: Array<SlashCommand>
		userContexts: Array<UserContext>
	}
)

const setCommands = (guild: Guild) => {
	guild.commands.set([
		...commands.msgContexts.map(msgContext => ({
			type: 'MESSAGE' as const,
			name: msgContext.name,
		})),
		...commands.slashCommands.map(command => ({
			type: 'CHAT_INPUT' as const,
			name: command.name,
			description: command.description,
			options: command.argDefs,
		})),
		...commands.userContexts.map(userContext => ({
			type: 'USER' as const,
			name: userContext.name,
		})),
	])
}

client.once('ready', () => {
	for (const [ , guild ] of client.guilds.cache) {
		setCommands(guild)
	}
	client.application?.commands
	console.log('ready!')
})

client.on('guildCreate', guild => {
	setCommands(guild)
})

client.on('interactionCreate', interaction => {
	const types: Array<{
		name: keyof typeof commands
		checker: keyof Interaction extends `${infer K}`
			 ? K extends keyof Interaction
			  ? Interaction[K] extends (() => boolean)
			   ? K
			   : never
			  : never
			 : never
	}> = [
		{
			name: 'msgContexts',
			checker: 'isMessageContextMenu'
		},
		{
			name: 'slashCommands',
			checker: 'isCommand'
		},
		{
			name: 'userContexts',
			checker: 'isUserContextMenu'
		},
	]
	if (interaction.inGuild()) {
		for (const type of types) {
			if (interaction[type.checker]() && interaction.isApplicationCommand()) {
				for (const item of commands[type.name]) {
					if (item.name === interaction.commandName) {
						// @ts-ignore
						item.execute(interaction)
						break
					}
				}
				break
			}
		}
	} else {
		if (interaction.isApplicationCommand() || interaction.isMessageComponent()) {
			interaction.reply('Useful Hammer is only valid in guilds.')
		}
	}
})

client.login(TOKEN)
