import { Box } from 'rebass'
import { UserSession, AppConfig } from 'blockstack'
import { configure, User, getConfig } from 'radiks'
import { useEffect, useState } from 'react'
import AppBar from 'src/components/AppBar'
import Footer from 'src/components/Footer'

// init app
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
configure({
  apiServer: 'http://161.189.86.182:1260',
  userSession,
})

const logo = '/dlakes.png'
const AppLayout = ({ children }) => {
  console.log(userSession)
  const [isSingedIn, setIsSingedIn] = useState(userSession.isUserSignedIn())

  const authRadiksAsync = async (userSession) => {
    try {
      console.log('auth')
      console.log('in 1')
      await userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, '/')
        console.log('pending session : ', userSession)
        // this.setState({ userData: userData })
        console.log(userData)
      })
      const currentUser = await User.createWithCurrentUser()
      console.log('1', currentUser)

      setIsSingedIn(true)
    } catch (error) {
      console.log(error)
    }
  }

  // run once componentDidMount
  useEffect(() => {
    const { userSession } = getConfig()
    console.log('effect session : ', userSession)
    if (userSession.isSignInPending()) {
      authRadiksAsync(userSession)
    }
  }, [])

  return (
    <>
      <AppBar userSession={userSession} isSingedIn={isSingedIn} logo={logo} />
      <Box
        sx={{
          width: 1000,
          px: 220,
          py: 60,
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default AppLayout
