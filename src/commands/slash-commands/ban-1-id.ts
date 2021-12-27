import { Formatters as Fmt } from 'discord.js'
import SlashCommand from '../../structure/SlashCommand'
import { ban } from '../../util'

export default new SlashCommand({
	name: 'ban-1-m',
	description: 'Ban single user by mention',
	argDefs: [
		{
			type: 'INTEGER',
			name: 'target',
			description: 'ID of user to ban',
			required: true,
		},
		{
			type: 'STRING',
			name: 'reason',
			description: 'Reason',
		},
	],
	async execute(interaction) {
		const userId = interaction.options.getInteger('target', true).toString()
		const reason = interaction.options.getString('reason', false)
		ban(interaction, userId, { reason: reason! })
			.then(async () => {
				await interaction.reply(`Banned ${Fmt.userMention(userId)}.`)
			})
			.catch(async reason => {
				await interaction.reply(reason)
			})
	}
})
