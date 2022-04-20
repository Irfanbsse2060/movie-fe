import React, {useEffect, useState} from 'react';
import {API_URL, HIGH_RES_IMAGE_BASE_URL} from "../../config/constants";
import {Skeleton, Image, Modal, Button} from 'antd';
import {useParams} from "react-router";
import './movie-detail-page.scss'

import MovieReviews from './MovieReviews'
import BookingForm from './BookingForm'


interface Movie {
    "adult": boolean,
    "title": string,
    "overview": string,
    "poster_path": string,
    "original_title": string,
    "release_date": string,
    "backdrop_path": string,
    "popularity": number,
    "vote_count": number,
    "budget": number;
    "genres": any[]
    "production_countries": any[]
    "production_companies": any[]
}


function MovieDetailPage() {
    const params = useParams();
    const [movie, setMovie] = useState<Movie>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async (): Promise<any> => {
            try {
                const response = await fetch(`${API_URL}/movies/${params.movieId}`)
                const data = await response.json()
                setMovie(data)
            } catch (e) {
                setError('something went wrong')
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [params]);


    return (
        <main>
            {isLoading && <Skeleton active/>}
            {error && <div>something went wrong</div>}
            {
                movie && (
                    <div className='movie-detail'>
                        <section className='movie-detail__top-section'>
                            <div>
                                <Image
                                    width={600}
                                    src={`${HIGH_RES_IMAGE_BASE_URL}/${movie.poster_path}`}
                                    placeholder={
                                        <Image
                                            preview={false}
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                            width={200}
                                        />
                                    }
                                />
                            </div>
                            <div>
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                                <Button type="primary" onClick={showModal}>
                                    Book Seat
                                </Button>
                                <div>
                                    <h2>Reviews</h2>
                                    <MovieReviews movieId={params.movieId as string}/>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }

            <Modal title="Basic Modal" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <BookingForm onSubmit={handleOk}/>
            </Modal>
        </main>
    );
}


export default MovieDetailPage;

