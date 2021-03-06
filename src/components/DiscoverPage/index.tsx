import React, {useEffect, useState} from 'react';
import {API_URL, IMAGE_BASE_URL} from "../../config/constants";
import {Skeleton} from 'antd';
import {Card} from 'antd';
import {Link} from "react-router-dom";
import SearchMovie from "./SearchMovie";
import {routePaths} from "../../config/routes";
import './discover-page.scss'
import {formatDate} from "../../utils/dateUtil";

const {Meta} = Card;

interface MovieOverview {
    id: string,
    title: string,
    overview: string,
    original_title: string,
    release_date: string
    poster_path: string
    vote_average: number
}

const MoviesOverviewList = ({movies}: { movies: MovieOverview[] }) => {

    return (
        <ul className='movie-overview-card'>
            {
                movies.map((movie) => {
                    return (
                        <Link to={routePaths.discoverMovie(movie.id)} key={movie.id}>
                            <li>
                                <Card
                                    hoverable
                                    style={{width: 240}}
                                    cover={<img alt="movie poster" src={`${IMAGE_BASE_URL}/${movie.poster_path}`}/>}
                                >
                                    <Meta title={movie.title} description={<div
                                        className="movie-overview-card__description">
                                        <h4>Release Date: {formatDate(movie.release_date)}</h4>
                                        <h4>Rating: {movie.vote_average}</h4>
                                        <p>{movie.overview}</p>
                                    </div>}/>
                                </Card>
                            </li>
                        </Link>

                    )

                })
            }
        </ul>
    )
}


function DiscoverPage() {
    const [moviesList, setMoviesList] = useState<MovieOverview[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        setIsLoading(true)
        const fetchData = async (): Promise<any> => {
            try {
                const response = await fetch(`${API_URL}/movies`)
                const data = await response.json()
                setMoviesList(data)
            } catch (e) {
                setError('something went wrong')
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, []);

    return (
        <main className='discovery-page'>
            <section className='discovery-page__search'>
                <SearchMovie/>
            </section>
            {isLoading && <Skeleton active/>}
            {error && <div>something went wrong</div>}
            {
                !error && !isLoading && moviesList && <MoviesOverviewList movies={moviesList}/>
            }
        </main>
    );
}

export default DiscoverPage;

