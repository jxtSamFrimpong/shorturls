import '../../styles/login.css'
import Footer from '../../components/Footer'

const Login = ({})=> {
    return (
        <div class="container">
        <nav>
            <a href="/" class="logo">
                <div class="logo-circle"></div>
                SHORTEN.IT
            </a>
        </nav>

        <div class="login-container">
            <h1 class="login-title">Login</h1>
            <form>
                <div class="form-group">
                    <label class="form-label">Username</label>
                    <input 
                        type="text" 
                        class="form-input" 
                        placeholder="Enter your username"
                        autocomplete="username"
                    />
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input 
                        type="password" 
                        class="form-input" 
                        placeholder="Enter your password"
                        autocomplete="current-password"
                    />
                </div>
                <button type="submit" class="login-btn">LOGIN</button>
            </form>
        </div>
        <Footer />
    </div>
    )
}

export default Login