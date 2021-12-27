import type { MessageContextMenuInteraction } from 'discord.js'
import type { GuildNonNullable } from '../type-util'

export interface IMsgContextInit {
	name: string
	execute: (interaction: GuildNonNullable<MessageContextMenuInteraction>) => void
}
export default class MsgContext {
	public readonly name: string
	public readonly execute: (interaction: GuildNonNullable<MessageContextMenuInteraction>) => void
	constructor(init: IMsgContextInit) {
		this.name = init.name
		this.execute = init.execute
	}
}
