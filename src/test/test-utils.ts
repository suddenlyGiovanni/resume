import { AST, ParseResult, Schema, TreeFormatter } from '@effect/schema'
import { Effect, Either, Option } from 'effect'

import { expect } from 'vitest'

export const onExcessPropertyError: AST.ParseOptions = {
	onExcessProperty: 'error',
}

export const onExcessPropertyPreserve: AST.ParseOptions = {
	onExcessProperty: 'preserve',
}

export const allErrors: AST.ParseOptions = {
	errors: 'all',
}

export const expectDecodeUnknownSuccess = async <A, I>(
	schema: Schema.Schema<A, I, never>,
	input: unknown,
	expected: A = input as any,
	options?: AST.ParseOptions,
) => expectSuccess(Schema.decodeUnknown(schema)(input, options), expected)

export const expectDecodeUnknownFailure = async <A, I>(
	schema: Schema.Schema<A, I, never>,
	input: unknown,
	message: string,
	options?: AST.ParseOptions,
) => expectFailure(Schema.decodeUnknown(schema)(input, options), message)

export const expectEncodeSuccess = async <A, I>(
	schema: Schema.Schema<A, I, never>,
	a: A,
	expected: unknown,
	options?: AST.ParseOptions,
) => expectSuccess(Schema.encode(schema)(a, options), expected)

export const expectEncodeFailure = async <A, I>(
	schema: Schema.Schema<A, I, never>,
	a: A,
	message: string,
	options?: AST.ParseOptions,
) => expectFailure(Schema.encode(schema)(a, options), message)

export const printAST = <A, I, R>(schema: Schema.Schema<A, I, R>) => {
	console.log('%o', schema.ast)
}

export const expectFailure = async <A>(
	effect: Either.Either<A, ParseResult.ParseError> | Effect.Effect<A, ParseResult.ParseError>,
	message: string,
) => {
	if (Either.isEither(effect)) {
		expectEitherLeft(effect, message)
	} else {
		expectEffectFailure(effect, message)
	}
}

export const expectSuccess = async <E, A>(
	effect: Either.Either<A, E> | Effect.Effect<A, E>,
	a: A,
) => {
	if (Either.isEither(effect)) {
		expectEitherRight(effect, a)
	} else {
		expectEffectSuccess(effect, a)
	}
}

export const expectEffectFailure = async <A>(
	effect: Effect.Effect<A, ParseResult.ParseError>,
	message: string,
) => {
	expect(
		await Effect.runPromise(Effect.either(Effect.mapError(effect, TreeFormatter.formatErrorSync))),
	).toStrictEqual(Either.left(message))
}

export const expectEffectSuccess = async <E, A>(effect: Effect.Effect<A, E>, a: A) => {
	expect(await Effect.runPromise(Effect.either(effect))).toStrictEqual(Either.right(a))
}

export const expectEitherLeft = <A>(
	e: Either.Either<A, ParseResult.ParseError>,
	message: string,
) => {
	expect(Either.mapLeft(e, TreeFormatter.formatErrorSync)).toStrictEqual(Either.left(message))
}

export const expectEitherRight = <E, A>(e: Either.Either<A, E>, a: A) => {
	expect(e).toStrictEqual(Either.right(a))
}

export const expectNone = <A>(o: Option.Option<A>) => {
	expect(o).toStrictEqual(Option.none())
}

export const expectSome = <A>(o: Option.Option<A>, a: A) => {
	expect(o).toStrictEqual(Option.some(a))
}
