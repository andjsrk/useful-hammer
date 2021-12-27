import { Formatters as Fmt } from 'discord.js'
import SlashCommand from '../../structure/SlashCommand'
import { ban } from '../../util'

export default new SlashCommand({
	name: 'ban-1-m',
	description: 'Ban single user by mention',
	argDefs: [
		{
			type: 'USER',
			name: 'target',
			description: 'User to ban',
			required: true,
		},
		{
			type: 'STRING',
			name: 'reason',
			description: 'Reason',
		},
	],
	async execute(interaction) {
		const user = interaction.options.getUser('target', true)
		const reason = interaction.options.getString('reason', false)
		ban(interaction, user.id, { reason: reason! })
			.then(async () => {
				await interaction.reply(`Banned ${Fmt.userMention(user.id)}.`)
			})
			.catch(async reason => {
				await interaction.reply(reason)
			})
	}
})
