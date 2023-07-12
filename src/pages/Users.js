import { Delete, Edit } from '@material-ui/icons'
import React, {useState} from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchUsers } from '../redux/apiCalls/users'
import { Link } from 'react-router-dom'
import { clearUsers } from '../redux/UseersComponentRedux'
import EditUser from '../components/EditUser'



const Container = styled.div`
    width: 100%;
    height: fit-content;
    overflow: hidden;
    margin: auto;   
    padding: 20px;
    border-radius: 1vmax;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    background-color: #f6fbfb;
    width: 1200px;
    max-width: 90%;
   
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    

`
const TopContainer = styled.div`
    padding: 0px 5px;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Title = styled.div`
    font-size: 2rem;
    font-weight: 300;
`
const TotalUsers = styled.div`
    font-size: 2rem;
    font-weight: 300;
`

const MiddleContainer = styled.div`
    width: 100%;
    overflow-y: auto;
`
const MiddleWrapper = styled.div`
    min-width: 620px;
`
const UsersContainer = styled.div`
    margin: 10px;
    display: flex;
    align-items: center;
`
const Avatar = styled.img`
    width: 30px;
    border-radius: 50%;
    margin-right: 5px;
    
`

const Name = styled.div`
    margin: 0px 5px;
    flex: 1;
    font-weight: 600;
`
const Email = styled.div`
    margin: 0px 5px;
    flex: 1;
`
const IsAdmin = styled.div`
    margin: 0px 5px;
    flex: 1;
    text-align: center;
    color: ${props => props.value === true ? "green" : "red"};
`
const IconContainer = styled.div`
    flex: 0.5;
    display: flex;
    justify-content: space-between;
`

const BottomContainer = styled.div`

`

const Error = styled.span`
    color: red;
    font-size: 20px;
    font-weight: 400;
    
`

function Users() {
    const data = useSelector(state => state.users);
    const users = data.fetchedUsers;
    const userisAdmin = useSelector(state => state.user?.currentUser?.isAdmin);
    console.log(data)

    const dispatch = useDispatch()
    console.log()
    useEffect(()=>{
        userisAdmin && fetchUsers(dispatch);  

        return () => {
            dispatch(clearUsers())
        }
    },[userisAdmin])


    //edit user
    const [isOpen, setIsOpen] = useState()

    const handleEdit = () => {
        console.log("i am action")
    }

  return ( <>
    <Container>
        <Wrapper>
        <TopContainer>
            <Title>User</Title>
            <TotalUsers>total : {users?.length}</TotalUsers>
        </TopContainer>

        <MiddleContainer>
            <MiddleWrapper>
                    <UsersContainer>
                        <Avatar style={{color: "black", fontWeight: "600"}}/>
                        <Name style={{color: "black", fontWeight: "600"}}>Name</Name>
                        <Email style={{color: "black", fontWeight: "600"}}>Email</Email>
                        <IsAdmin style={{color: "black", fontWeight: "600"}}>isAdmin</IsAdmin>
                        <IconContainer style={{color: "black", fontWeight: "600"}}>
                        Edit
                        </IconContainer>         
                    </UsersContainer>
            </MiddleWrapper>
            <hr/> 
            <MiddleWrapper>  
                {users?.map((p) => (
                    <UsersContainer key={p._id}>
                    <Avatar src={ p.avatar}/>
                    <Name>{`${p.firstName} ${p.lastName}`}</Name>
                    <Email>{p.email}</Email>
                    <IsAdmin value = {p.isAdmin} >{JSON.stringify(p.isAdmin)}</IsAdmin>
                    <IconContainer>
                        <Edit onClick={() => setIsOpen(true)} />
                        <Delete/>
                    </IconContainer>
                        
                    </UsersContainer>
                ))}
            </MiddleWrapper>
            {data?.isError && <MiddleWrapper><Error>{data.error}</Error></MiddleWrapper>}
        </MiddleContainer>

        <BottomContainer>
        </BottomContainer>
        </Wrapper>
    </Container>
    <EditUser isOpen={isOpen} setIsOpen={setIsOpen} action={handleEdit} title="Edit user" desc=""/>
    </>
    
  )
}

export default Users