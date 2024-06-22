import styled from "styled-components"
import owner from '../../assets/img-png/owner.png'


const AboutBody = styled.body`

max-width: 1440px;
`;

const OwnerImg = styled.img`
display: block
  width: auto;
  height: auto;
  max-width: 20%;
`

const AboutWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
align-content: center

`



const About = () => {


    return(
        <AboutBody>

            <AboutWrapper>



            <OwnerImg src={owner} alt={'Chic Haven Owner'} />

            <h1>What We're About</h1>

            <div>
            <p>
            Welcome to Chic Haven, a boutique that redefines online shopping with a commitment to quality and sustainability. Based in Detroit, MI, we offer a curated selection of clothing from talented minority designers both in the United States and abroad. Our mission is to make high-quality, sustainably sourced fashion accessible to all women.
            At the heart of Chic Haven is our visionary founder, Gloria Antoinette, who believes that every person deserves to feel beautiful and seen. This core belief drives our dedication to showcasing the exceptional work of up-and-coming designers and models of color. We are proud to provide a platform that celebrates diversity and empowers our community.
            Discover fashion that stands for more than just trends. Discover Chic Haven!
            </p>
            </div>


            </AboutWrapper>


        </AboutBody>
    )
}

export default About