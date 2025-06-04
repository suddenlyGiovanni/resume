import { Effect, Either, Option, type ParseResult, Schema, type SchemaAST } from 'effect'
import { TreeFormatter } from 'effect/ParseResult'

import { expect } from 'vitest'

export const onExcessPropertyError: SchemaAST.ParseOptions = {
	onExcessProperty: 'error',
}

export const onExcessPropertyPreserve: SchemaAST.ParseOptions = {
	onExcessProperty: 'preserve',
}

export const allErrors: SchemaAST.ParseOptions = {
	errors: 'all',
}

export async function expectDecodeUnknownSuccess<A, I>(
	schema: Schema.Schema<A, I, never>,
	input: unknown,
	expected: A = input as any,
	options?: SchemaAST.ParseOptions,
): Promise<void> {
	return expectSuccess(Schema.decodeUnknown(schema)(input, options), expected)
}

export async function expectDecodeUnknownFailure<A, I>(
	schema: Schema.Schema<A, I, never>,
	input: unknown,
	message: string,
	options?: SchemaAST.ParseOptions,
): Promise<void> {
	return expectFailure(Schema.decodeUnknown(schema)(input, options), message)
}

export async function expectEncodeSuccess<A, I>(
	schema: Schema.Schema<A, I, never>,
	a: A,
	expected: unknown,
	options?: SchemaAST.ParseOptions,
): Promise<void> {
	return expectSuccess(Schema.encode(schema)(a, options), expected)
}

export async function expectEncodeFailure<A, I>(
	schema: Schema.Schema<A, I, never>,
	a: A,
	message: string,
	options?: SchemaAST.ParseOptions,
): Promise<void> {
	return expectFailure(Schema.encode(schema)(a, options), message)
}

export function printAST<A, I, R>(schema: Schema.Schema<A, I, R>): void {
	console.log('%o', schema.ast)
}

export async function expectFailure<A>(
	effect: Either.Either<A, ParseResult.ParseError> | Effect.Effect<A, ParseResult.ParseError>,
	message: string,
): Promise<void> {
	if (Either.isEither(effect)) {
		expectEitherLeft(effect, message)
	} else {
		await expectEffectFailure(effect, message)
	}
}

export async function expectSuccess<E, A>(effect: Either.Either<A, E> | Effect.Effect<A, E>, a: A): Promise<void> {
	if (Either.isEither(effect)) {
		expectEitherRight(effect, a)
	} else {
		await expectEffectSuccess(effect, a)
	}
}

export async function expectEffectFailure<A>(
	effect: Effect.Effect<A, ParseResult.ParseError>,
	message: string,
): Promise<void> {
	expect(await Effect.runPromise(Effect.either(Effect.mapError(effect, TreeFormatter.formatErrorSync)))).toStrictEqual(
		Either.left(message),
	)
}

export async function expectEffectSuccess<E, A>(effect: Effect.Effect<A, E>, a: A): Promise<void> {
	expect(await Effect.runPromise(Effect.either(effect))).toStrictEqual(Either.right(a))
}

export function expectEitherLeft<A>(e: Either.Either<A, ParseResult.ParseError>, message: string): void {
	expect(Either.mapLeft(e, TreeFormatter.formatErrorSync)).toStrictEqual(Either.left(message))
}

export function expectEitherRight<E, A>(e: Either.Either<A, E>, a: A): void {
	expect(e).toStrictEqual(Either.right(a))
}

export function expectNone<A>(o: Option.Option<A>): void {
	expect(o).toStrictEqual(Option.none())
}

export function expectSome<A>(o: Option.Option<A>, a: A): void {
	expect(o).toStrictEqual(Option.some(a))
}
