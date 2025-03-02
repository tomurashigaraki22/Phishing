import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from '../AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ProfileSettings from './pages/Profile';
import Links from './pages/Links';
import Credits from './pages/Credits';
import BuyCredits from './pages/AddFunds';
import SocialMediaForm from './pages/CreateLink';
import VotingPage from './pages/Voting';
import GiveawayPage from './pages/Giveaway';
import SocialLogin from './pages/SocialLogin';

function AppRoutes() {
    const { user, token, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            {user && token ? (
                <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<ProfileSettings />} />
                    <Route path="/links" element={<Links />} />
                    <Route path="/credits" element={<Credits />} />
                    <Route path="/buycredits" element={<BuyCredits />} />
                    <Route path="/createlink" element={<SocialMediaForm />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />

                    {/* Dynamic routes */}
                    <Route path="/:username/:id/voting/:social" element={<VotingPage />} />
                    <Route path="/:username/:id/giveaway/:social" element={<GiveawayPage />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;
