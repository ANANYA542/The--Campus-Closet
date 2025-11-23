import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("account");

  if (!user) {
    return (
      <div className="auth">
        <div className="info-section">
          <div className="info-icon">🔒</div>
          <h2>You're not logged in</h2>
          <p className="muted" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Please log in to view your profile
          </p>
          <Link to="/login" className="btn btn--primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Header Section */}
      <div style={{ 
        backgroundColor: 'var(--bg-primary)', 
        padding: '2rem', 
        borderRadius: '8px',
        border: '1px solid var(--border)',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div className="profile-avatar" style={{ margin: 0 }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
              {user.name}
            </h1>
            <p className="muted">{user.email}</p>
            <div style={{ marginTop: '0.75rem' }}>
              <span className={`role-badge role-badge--${user.role}`}>
                {user.role === 'seller' ? '🏪 Seller' : '🛍️ Buyer'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ 
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        overflow: 'hidden'
      }}>
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid var(--border)',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab("account")}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: activeTab === "account" ? 'var(--bg-secondary)' : 'transparent',
              borderBottom: activeTab === "account" ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === "account" ? '700' : '400',
              color: 'var(--text-primary)',
              fontSize: '0.9375rem',
              transition: 'all 0.2s'
            }}
          >
            Account Details
          </button>
          <button
            onClick={() => setActiveTab("security")}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: activeTab === "security" ? 'var(--bg-secondary)' : 'transparent',
              borderBottom: activeTab === "security" ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === "security" ? '700' : '400',
              color: 'var(--text-primary)',
              fontSize: '0.9375rem',
              transition: 'all 0.2s'
            }}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: activeTab === "activity" ? 'var(--bg-secondary)' : 'transparent',
              borderBottom: activeTab === "activity" ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === "activity" ? '700' : '400',
              color: 'var(--text-primary)',
              fontSize: '0.9375rem',
              transition: 'all 0.2s'
            }}
          >
            Activity
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '2rem' }}>
          {activeTab === "account" && (
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Personal Information
              </h3>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Name
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>{user.name}</div>
                  </div>
                  <button className="btn btn--ghost" style={{ padding: '0.5rem 1rem' }}>
                    Edit
                  </button>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Email
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>{user.email}</div>
                  </div>
                  <button className="btn btn--ghost" style={{ padding: '0.5rem 1rem' }}>
                    Edit
                  </button>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      URN ID
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {user.urnId || "Not set"}
                    </div>
                  </div>
                  <button className="btn btn--ghost" style={{ padding: '0.5rem 1rem' }}>
                    {user.urnId ? 'Edit' : 'Add'}
                  </button>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Account Type
                    </div>
                    <div style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                      {user.role}
                    </div>
                  </div>
                  <button className="btn btn--ghost" style={{ padding: '0.5rem 1rem' }}>
                    Switch Role
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Login & Security
              </h3>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ 
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        🔐 Password
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Last changed 30 days ago
                      </div>
                    </div>
                    <Link to="/forgot-password" className="btn btn--ghost">
                      Change
                    </Link>
                  </div>
                </div>

                <div style={{ 
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        📧 Email Verification
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Your email is verified
                      </div>
                    </div>
                    <span style={{ 
                      padding: '0.5rem 1rem',
                      backgroundColor: '#ecfdf5',
                      color: 'var(--success)',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontWeight: '700'
                    }}>
                      ✓ Verified
                    </span>
                  </div>
                </div>

                <div style={{ 
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        🔔 Login Alerts
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Get notified of unusual login activity
                      </div>
                    </div>
                    <button className="btn btn--ghost">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Recent Activity
              </h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ 
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      📦 Orders
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      0 total orders
                    </div>
                  </div>
                  <button className="btn btn--ghost">
                    View All
                  </button>
                </div>

                <div style={{ 
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {user.role === 'seller' ? '🏪 Your Listings' : '❤️ Saved Items'}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {user.role === 'seller' ? '0 active listings' : '0 items saved'}
                    </div>
                  </div>
                  <button className="btn btn--ghost">
                    View All
                  </button>
                </div>

                <div style={{ 
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      💬 Messages
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      No new messages
                    </div>
                  </div>
                  <button className="btn btn--ghost">
                    View All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ 
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid #dc2626',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: 'var(--shadow)'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--error)' }}>
          Danger Zone
        </h3>
        <p className="muted" style={{ marginBottom: '1.5rem' }}>
          Once you logout, you'll need to sign in again to access your account
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn--primary" onClick={logout}>
            Logout
          </button>
          <button className="btn btn--ghost" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;