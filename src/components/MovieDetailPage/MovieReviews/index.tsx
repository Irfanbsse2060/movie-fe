// @ts-nocheck
import React, {useState} from 'react'
import {List, Avatar, Button, Skeleton, Rate} from 'antd';
import {API_URL, IMAGE_BASE_URL} from "../../../config/constants";

const MovieReviews = ({movieId} : {movieId:string}) =>{

    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(true)

    React.useEffect(()=>{
        const fetchData = async (): Promise<any> => {
            try {
                setLoading(true)
                const response = await fetch(`${API_URL}/movies/${movieId}/reviews?${page}`)
                const res = await response.json()
                setList(res.results)
            }
            catch (e) {
                setError('something went wrong')
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const getImageUrl = (imageName)=> imageName && imageName.substring(1, imageName.length)

    return (
        <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={getImageUrl(item?.author_details?.avatar_path)} />}
                        title={<a href="https://ant.design">{item.author}</a>}
                        description={<div>
                            <Rate value={item?.author_details?.rating} count={10} /> <br/>
                            {item.content}
                        </div>}
                    />
                    <div>

                    </div>
                </List.Item>
            )}
        />
    );

}
export default MovieReviews