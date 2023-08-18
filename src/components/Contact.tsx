import styled from "@emotion/styled";

type ContactProps = {
    id:number;
    name:string;
    phone:string;
}

const Card = styled.div`
    padding:5px;
    border-radius:5px;
    margin-top:10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

function Contact({id, name, phone}:ContactProps){
    return <Card>
        <p>{name}</p>
        <p>{phone}</p>
    </Card>
}

export default Contact;