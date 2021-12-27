import type { BanOptions, Interaction, Snowflake } from 'discord.js'
import type { GuildNonNullable } from './type-util'

export const ban = async (interaction: GuildNonNullable<Interaction>, memberId: Snowflake, options: BanOptions = {}) => {
	const member = interaction.guild.members.cache.get(memberId) ?? await interaction.guild.members.fetch(memberId)
	if (interaction.guild.me!.permissions.has('BAN_MEMBERS', true) && member.bannable) {
		await member.ban(options)
	} else throw 'The bot haven\'t permissions.'
}
export const kick = async (interaction: GuildNonNullable<Interaction>, memberId: Snowflake, reason?: string) => {
	const member = interaction.guild.members.cache.get(memberId) ?? await interaction.guild.members.fetch(memberId)
	if (interaction.guild.me!.permissions.has('KICK_MEMBERS', true) && member.kickable) {
		await member.kick(reason)
	} else throw 'The bot haven\'t permissions.'
}
