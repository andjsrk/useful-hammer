import type { Guild, Snowflake } from 'discord.js'

export type ToCamel<S extends string> =
	S extends `${infer F}-${infer B}`
	 ? `${F}${ToCamel<B>}`
	 : S

export type GuildNonNullable<T extends { guild: Guild | null }> =
	(
		Omit<T, 'guild' | 'guildId'> & { readonly guild: Guild }
	) & (
		T extends { guildId: any }
		 ? T extends { guildId: Snowflake | null }
		  ? { guildId: NonNullable<T['guildId']> }
		  : { guildId: T['guildId'] }
		 : {}
	)
