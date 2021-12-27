import type { CommandInteraction, ApplicationCommandOptionData } from 'discord.js'
import type { GuildNonNullable } from '../type-util'

export interface ISlashCommandInit {
	name: string
	description: string
	argDefs: Array<ApplicationCommandOptionData>
	execute: (interaction: GuildNonNullable<CommandInteraction>) => void
}
export default class SlashCommand {
	public readonly name: string
	public readonly description: string
	public readonly argDefs: Array<ApplicationCommandOptionData>
	public readonly execute: (interaction: GuildNonNullable<CommandInteraction>) => void
	constructor(init: ISlashCommandInit) {
		this.name = init.name
		this.description = init.description
		this.argDefs = init.argDefs
		this.execute = init.execute
	}
}
