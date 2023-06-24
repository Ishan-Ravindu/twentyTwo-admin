import { Delete, Edit } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { req } from '../axiosReqMethods'
import { fetchUsers } from '../redux/apiCalls/users'



const Container = styled.div`
    width: 100%;
    height: fit-content;
    overflow: hidden;
    padding: 20px;
    border-radius: 1vmax;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #f6fbfb;
   
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
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

function User() {
    const data = useSelector(state => state.users);
    const users = data.fetchedUsers;
    console.log(users)
    const dispatch = useDispatch()

    useEffect(()=>{
        fetchUsers(dispatch);   
    },[])

    users.map((p) => {
        console.log(p.isAdmin)
    })

  return (
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
                    <UsersContainer key={p.id}>
                    <Avatar src={ p.avatar && "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}/>
                    <Name>{`${p.firstName} ${p.lastName}`}</Name>
                    <Email>{p.email}</Email>
                    <IsAdmin value = {p.isAdmin} >{JSON.stringify(p.isAdmin)}</IsAdmin>
                    <IconContainer>
                        <Edit/>
                        <Delete/>
                    </IconContainer>
                        
                    </UsersContainer>
                ))}
            </MiddleWrapper>
        </MiddleContainer>

        <BottomContainer>
        </BottomContainer>
        </Wrapper>
    </Container>
  )
}

export default User