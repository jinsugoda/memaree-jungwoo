export declare interface NavigationButton {
    selector: boolean;
    size: number;
    notification: number;
}

export declare interface ActionButton {
    inverted: boolean;
    selected: boolean;
    size: number;
    Action: (boolean) => void;
}

export type MutateAction = (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
