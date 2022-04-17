import React, {useEffect, useState} from 'react';
import {API_URL, IMAGE_BASE_URL} from "../../config/constants";
import { Skeleton } from 'antd';
import './DiscoverPage.scss'
import { Card } from 'antd';

const { Meta } = Card;
interface MovieOverview {
    id: string,
    title: string,
    overview: string,
    original_title: string,
    release_date: string
    poster_path: string
}

const MoviesOverviewList = ({movies} : {movies:MovieOverview[]}) =>{

    return (
        <ul className='movie-overview-card'>
            {
                movies.map((movie)=>{
                    return (
                        <li key={movie.id}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="movie poster" src={`${IMAGE_BASE_URL}/${movie.poster_path}`} />}
                            >
                                <Meta title="Europe Street beat" description="www.instagram.com" />
                            </Card>
                        </li>
                    )

                })
            }
        </ul>
    )
}


function DiscoverPage() {
    const [moviesList, setMoviesList] = useState<MovieOverview[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string| null>(null)
    useEffect(() => {
        setIsLoading(true)
        const fetchData = async (): Promise<any> => {
            try {
                const response = await fetch(`${API_URL}/movies`)
                const data = await response.json()
                setMoviesList(data)
            }
            catch (e) {
                setError('something went wrong')
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, []);

    return (
        <main className='discovery-page'>
            {isLoading && <Skeleton active />}
            { error && <div>something went wrong</div>}
            {
                moviesList && <MoviesOverviewList movies={moviesList}/>
            }
        </main>
    );
}

export default DiscoverPage;

