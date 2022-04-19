// @ts-nocheck
import React, {useState} from 'react'
import { List, Avatar, Button, Skeleton } from 'antd';
import {API_URL} from "../../../config/constants";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;


const MovieReviews = ({movieId} : {movieId:string}) =>{

    const [list, setList] = useState([])
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [initLoading, setInitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadMore, setLoadMore] = useState(true)

    React.useEffect(()=>{
        const fetchData = async (): Promise<any> => {
            try {
                const response = await fetch(`${API_URL}/movies/${movieId}/reviews?${page}`)
                const res = await response.json()
                setData(res.results)
                setList(res.results)
                results.page <= page && loadMore(false)
            }
            catch (e) {
                setError('something went wrong')
            }
            finally {
                setInitLoading(false)
            }
        }
        fetchData()
        // fetch(fakeDataUrl)
        //     .then(res => res.json())
        //     .then(res => {
        //         setInitLoading(false)
        //         setData(res.results)
        //         setList(res.results)
        //     });
    }, [])

    const onLoadMore = () => {
        setLoading(true)
        setList(data.concat(
            [...new Array(count)].map(() => ({ loading: true, author_details: {}, author: '',content:'' })),
        ))
        setPage(page+1)
        fetch(fakeDataUrl)
            .then(res => res.json())
            .then(res => {
                const concatedData = data.concat(res.results);
                setData(concatedData)
                setList(concatedData)
                setLoading(false)
                res.page <= page && loadMore(false)
            });
    };
    const renderLoadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;
     return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={renderLoadMore}
            dataSource={list}
            renderItem={item => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item?.author_details?.avatar_path} />}
                            title={<a href="https://ant.design">{item.author}</a>}
                            description={item.content}
                        />
                        <div>content</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}
export default MovieReviews