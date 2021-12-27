import { Formatters as Fmt } from 'discord.js'
import UserContext from '../../structure/UserContext'
import { kick } from '../../util'

export default new UserContext({
	name: 'Kick',
	async execute(interaction) {
		const userId = interaction.targetUser.id
		kick(interaction, userId)
			.then(async () => {
				await interaction.reply(`Kicked ${Fmt.userMention(userId)}.`)
			})
			.catch(async reason => {
				await interaction.reply(reason)
			})
	}
})
