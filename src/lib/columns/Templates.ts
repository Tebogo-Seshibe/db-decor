// Class decorator
function ClassDecor(): ClassDecorator
{
    return (constructor: Function) =>
    {

    }
}

// Property decorator
function PropertyDecor(): PropertyDecorator
{
    return (object: Object, propertyKey: string | symbol) =>
    {

    }
}

// Accessor decorator
function AccessorDecor(): MethodDecorator
{
    return <T>(object: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) =>
    {
        
    }
}

// Function decorator
function FunctionDecor(): MethodDecorator
{
    return <T>(object: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) =>
    {

    }
}

// Parameter decorator
function ParameterDecor(): ParameterDecorator
{
    return (object: Object, propertyKey: string | symbol, index: number) =>
    {

    }
}

interface IComponent
{
    name: string
    template: string
    style: string
}
function Component(category: IComponent): ClassDecorator
{
    return (constructor: Function) =>
    {

    }
}

@Component({
    name: 'Person',
    style: 'Person.scss',
    template: 'Person.html'
})
class Person
{
    @PropertyDecor()
    private name!: string

    @AccessorDecor()
    public get getName(): string
    {
        return this.name
    }

    @AccessorDecor()
    public set setName(n: string)
    {
        this.name = n
    }

    @FunctionDecor()
    public sayHello(@ParameterDecor() other: string): void
    {
        console.log(`Hello there. My name is ${ this.name }`)
    }
}
