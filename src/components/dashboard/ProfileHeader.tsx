
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps {
  displayName: string;
  profilePicture: string;
}

const ProfileHeader = ({ displayName, profilePicture }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl font-medium text-slate-900">Welcome back, {displayName}</h2>
        <p className="text-slate-500">Here's your financial summary</p>
      </div>
      <img
        src={profilePicture}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer shadow-md border-2 border-white"
        onClick={() => navigate('/profile')}
      />
    </div>
  );
};

export default ProfileHeader;
