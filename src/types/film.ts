export interface FilmCardItem {
    id: number | string;
    name_hk: string;
    name_en: string;
    name_simplified: string;
    director_en: string;
    director_hk: string;
    director_simplified: string;
    rating_douban: number | null;
    poster_url_internal?:string;
}

export interface FilmItem {
     id:number;
     film_source_id: number;
     imdb_id?: string;
     douban_id?: string;
     name_hk: string;
     name_en: string;
     name_simplified: string;
     language?: string;
     on_screen_date?: string;
     duration?: string;
     genres?: string;
     poster_url_external?: string;
     poster_url_internal?: string;
     director_en: string;
     director_hk: string;
     director_simplified: string;
     cast_en?: string;
     cast_hk?: string;
     cast_simplified?: string;
     rating_douban: number;
     rating_imdb: number;
     country?: string;
     status?: number;
     source: number;

}

