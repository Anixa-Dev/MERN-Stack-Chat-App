import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast, { LoaderIcon } from 'react-hot-toast'
import { completeOnboarding } from '../lib/api'
import { CameraIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react'
import { LANGUAGES } from '../constants'

const OnboardingPage = () => {

  const { authUser } = useAuthUser()
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  })

  const { mutate: onboradingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile onboarded successfully');
      queryClient.invalidateQueries({ qreryKey: ["authUser"] })
    },
    onError: (error)=>{toast.error(error.response.data.message)}
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onboradingMutation(formState);
  }

  const handleRandomAvatar = async () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`;
    setFormState({ ...formState, profilePic: randomAvatar })
    toast.success('Random profile picture generated!')
  }

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4 '>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className='flex flex-col items-center justify-center space-y-4'>
              {/* Image Preview */}
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt='profile preview' className='w-full h-full object-cover' />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40' />
                  </div>
                )}
              </div>
              {/* generate Profile avatar */}
              <div className='flex items-center gap-2'>
                <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
                  <ShuffleIcon className='size-4 mr-2' />
                  Generate Random Avatar
                </button>
              </div>
            </div>


            {/* Full Name */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <input type="text"
                name='fullName'
                placeholder='Your full name'
                className='input input-bordered w-full'
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })} />
            </div>

            {/* Bio */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Bio</span>
              </label>
              <textarea
                name='bio'
                placeholder='Tell others about yourself and your language learning goals'
                className='textarea textarea-bordered h-24'
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })} />
            </div>

            {/* Languages */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {/* Native Language */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className='select select-bordered w-full'>
                  <option value="">Select your native language</option>
                  {
                    LANGUAGES.map((lang) => (
                      <option key={`native=${lang}`} value={lang.toLowerCase()} >
                        {lang}
                      </option>
                    ))
                  }
                </select>
              </div>

              {/* Learning Language */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className='select select-bordered w-full'>
                  <option value="">Select your learning language</option>
                  {
                    LANGUAGES.map((lang) => (
                      <option key={`native=${lang}`} value={lang.toLowerCase()} >
                        {lang}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>

            {/* Location */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Location</span>
              </label>
              <div className='relative'>
                <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70' />
                <input
                  type='text'
                  name='location'
                  placeholder='City, Country'
                  className='input input-bordered w-full pl-10'
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })} />
              </div>
            </div>

            {/* Submit Button */}
            <button className='btn btn-primary w-full' disabled={isPending} type='submit'>
              {!isPending ?
                <>
                  <ShipWheelIcon className='mr-2 size-5' />
                  Complete Onboarding
                </>
                :
                <>
                  <LoaderIcon className='mr-2 size-5 animate-spin' />
                  Onboarding...
                </>}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default OnboardingPage