import { Formatters as Fmt } from 'discord.js'
import UserContext from '../../structure/UserContext'
import { ban } from '../../util'

export default new UserContext({
	name: 'Ban',
	async execute(interaction) {
		const userId = interaction.targetUser.id
		ban(interaction, userId)
			.then(async () => {
				await interaction.reply(`Banned ${Fmt.userMention(userId)}.`)
			})
			.catch(async reason => {
				await interaction.reply(reason)
			})
	}
})
