import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_login: string;
  is_active: boolean;
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, admins: 0 });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    setIsAdmin(data?.role === 'admin');
    if (data?.role === 'admin') {
      loadUsers();
    } else {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    const { data } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });
    if (data) {
      setUsers(data);
      setStats({
        total: data.length,
        active: data.filter(u => u.is_active).length,
        admins: data.filter(u => u.role === 'admin').length
      });
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!isAdmin) return <div className="p-8">Access Denied</div>;

  return (
    <div className="flex-1 p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-4xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Active Users</h3>
          <p className="text-4xl font-bold">{stats.active}</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Admins</h3>
          <p className="text-4xl font-bold">{stats.admins}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Created</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t dark:border-gray-700">
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">{u.full_name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${u.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
