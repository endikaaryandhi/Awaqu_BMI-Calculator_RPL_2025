// src/components/EditBio.js
import React, { useState, useEffect } from 'react';
import { FaLeaf, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { supabase } from '../utils/supabaseClient'; 
import { toast } from 'react-hot-toast';

const MAX_BIO_LENGTH = 100; 

const EditBio = ({ userId, initialBio, onBioUpdateSuccess }) => {
  const [bio, setBio] = useState((initialBio || '').slice(0, MAX_BIO_LENGTH));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBio((initialBio || '').slice(0, MAX_BIO_LENGTH));
  }, [initialBio]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setBio((initialBio || '').slice(0, MAX_BIO_LENGTH)); 
    setIsEditing(false);
  };

  const handleSave = async () => {
    const currentInitialBio = (initialBio || '').slice(0, MAX_BIO_LENGTH);
    if (bio === currentInitialBio && bio.length <= MAX_BIO_LENGTH) {
      setIsEditing(false);
      return; 
    }

    setIsLoading(true);
    try {
      const bioToSave = bio.slice(0, MAX_BIO_LENGTH);

      const { error } = await supabase
        .from('profiles')
        .update({ bio: bioToSave }) 
        .eq('id', userId);

      if (error) {
        throw error;
      }

      toast.success('Bio updated successfully!');
      setBio(bioToSave); 
      setIsEditing(false);
      if (onBioUpdateSuccess) {
        onBioUpdateSuccess(bioToSave); 
      }
    } catch (error) {
      console.error('Error updating bio:', error.message);
      toast.error('Failed to update bio. ' + error.message);
      setBio((initialBio || '').slice(0, MAX_BIO_LENGTH));
    } finally {
      setIsLoading(false);
    }
  };

  // Handler untuk perubahan pada textarea
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const charsUsed = bio.length;

  return (
    <div className="flex items-start gap-4">
      <div className={`bg-lime-300 p-3 rounded-full self-start ${isEditing ? 'mt-2' : ''}`}>
        <FaLeaf />
      </div>
      <div className="flex-1">
        <p className="font-semibold">Bio</p>
        {isEditing ? (
          <div className="mt-1">
            <textarea
              value={bio}
              onChange={handleBioChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              rows="3"
              placeholder="Tell us about yourself..."
              disabled={isLoading}
              maxLength={MAX_BIO_LENGTH} 
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isLoading || charsUsed > MAX_BIO_LENGTH} 
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-sm font-semibold hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <FaSave /> {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-semibold hover:bg-gray-300 transition disabled:opacity-50 flex items-center gap-1"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
              <p className={`text-xs ${charsUsed > MAX_BIO_LENGTH ? 'text-red-500' : 'text-gray-500'}`}>
                {charsUsed}/{MAX_BIO_LENGTH}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between group">
            <p className="text-gray-600 break-all pr-2">
              {(bio || '').slice(0, MAX_BIO_LENGTH) || 'No bio yet. Click edit to add one!'}
            </p>
            <button
              onClick={handleEdit}
              className="p-1 text-gray-500 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit bio"
            >
              <FaEdit />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBio;