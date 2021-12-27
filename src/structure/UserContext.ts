import type { UserContextMenuInteraction } from 'discord.js'
import type { GuildNonNullable } from '../type-util'

export interface IUserContextInit {
	name: string
	execute: (interaction: GuildNonNullable<UserContextMenuInteraction>) => void
}
export default class UserContext {
	public readonly name: string
	public readonly execute: (interaction: GuildNonNullable<UserContextMenuInteraction>) => void
	constructor(init: IUserContextInit) {
		this.name = init.name
		this.execute = init.execute
	}
}
