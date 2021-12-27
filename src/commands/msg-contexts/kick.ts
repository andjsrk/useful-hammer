import { Formatters as Fmt } from 'discord.js'
import MsgContext from '../../structure/MsgContext'
import { kick } from '../../util'

export default new MsgContext({
	name: 'Kick',
	async execute(interaction) {
		const userId = interaction.targetMessage.author.id
		kick(interaction, userId)
			.then(async () => {
				await interaction.reply(`Kicked ${Fmt.userMention(userId)}.`)
			})
			.catch(async reason => {
				await interaction.reply(reason)
			})
	}
})
