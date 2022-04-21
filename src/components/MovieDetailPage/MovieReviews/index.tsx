import React, {useState} from 'react'
import {List, Avatar, Rate} from 'antd';
import {API_URL} from "../../../config/constants";


interface Review {
    author: string,
    author_details: { name: string, url: string, username: string, avatar_path: string, rating: string },
    content: string,
    created_at: string,
    id: string,
    updated_at: string,
    url: string,

}

interface MovieReviewResponse {
    results: Review[],
    total_pages: number,
    total_results: number
}

const initialMovieReviewData = {
    results: [],
    total_pages: 0,
    total_results: 0
}


const MovieReviews = ({movieId}: { movieId: string }) => {
    const [data, setData] = useState<MovieReviewResponse>(initialMovieReviewData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const page = 1; // TODO: need to implement pagination
    React.useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                setLoading(true)
                const response = await fetch(`${API_URL}/movies/${movieId}/reviews?${page}`)
                const res = await response.json()
                setData(res)
            } catch (e) {
                setError('something went wrong')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [movieId])
    const getImageUrl = (imageName: string) => imageName && imageName.substring(1, imageName.length)

    const reviewsList = data?.results || []
    const totalReviews = data?.total_results || 0

    if (error)
        <div/>;

    return (
        <>
            <h3>Total reviews: {totalReviews}</h3>
            <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={reviewsList}
                locale={{emptyText: 'No review'}}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={getImageUrl(item?.author_details?.avatar_path)}/>}
                            title={item.author}
                            description={<div>
                                <Rate disabled value={parseFloat(item?.author_details?.rating) as number} count={10}/>
                                <br/>
                                {item.content}
                            </div>}
                        />
                        <div>

                        </div>
                    </List.Item>
                )}
            />

        </>

    );

}
export default MovieReviews