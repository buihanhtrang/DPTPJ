
export interface IConfiguratorOption {
    colors: Array<string>
    title: string
    selectedColor: string
}

export interface IConfiguration {
    options: IConfiguratorOption
    title: string
}

export interface DetailConfiguratorOption {
    Detail: string;
    Info: string;
}
