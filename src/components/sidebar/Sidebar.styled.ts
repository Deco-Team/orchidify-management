import styled from '@emotion/styled'

export const Wrapper = styled.div`
  background-color: #f7f7fa;
  position: fixed;
  top: 0;
  z-index: 1;

  @media (min-width: 0px) {
    width: 100vw;
    height: 50px;
  }

  @media (min-width: 900px) {
    width: 300px;
    height: 100%;
    box-shadow: 2px 0px 5px 1px rgba(0, 0, 0, 0.15);
  }
`

export const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  margin: 2rem 0;
`

export const Logo = styled.img`
  border-radius: 100px;
  width: 6rem;
  height: 3rem;
  object-fit: cover;
  margin: 0 1rem;
`
