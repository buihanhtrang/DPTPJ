
export interface IConfiguratorOption {
    colors: Array<string>
    title: string
    selectedColor: string
}

export interface IConfiguration {
    options: IConfiguratorOption
    title: string
}
