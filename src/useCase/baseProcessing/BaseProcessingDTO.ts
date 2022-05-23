export type InfoClient = {
    to: string;
    campaignMessage: string;
    blacklist: boolean;
    flags?: string[];
    sended: boolean;
}

export interface BaseProcessingDTO {
    infos: InfoClient[];
}