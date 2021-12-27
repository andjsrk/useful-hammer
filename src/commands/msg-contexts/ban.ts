import { Formatters as Fmt } from 'discord.js'
import MsgContext from '../../structure/MsgContext'
import { ban } from '../../util'

export default new MsgContext({
	name: 'Ban',
	async execute(interaction) {
		const userId = interaction.targetMessage.author.id
		ban(interaction, userId)
			.then(async () => {
				await interaction.reply(`Banned ${Fmt.userMention(userId)}.`)
			})
			.catch(async reason => {
				await interaction.reply(reason)
			})
	}
})
