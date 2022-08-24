import { Routes, Route} from 'react-router-dom'
import React from 'react'

import SignIn from './memberLogin/signIn';
import MemberCollections from './memberCollections/memberCollections';
import MemberProfile from './memberProfile/member_profile';
import SignUp from './memberSignUp/signUp';
import MemberVerify from './memberVerify/memberVerify';
import MemberData from './memberData/memberData';
import MemberOrders from './memberOrders/memberOrders';
import MemberEvents from './memberEvents/memberEvents';
import MemberLevel from './memberLevel/memberLevel';
import MemberRecipe from './memberRecipe/memberRecipe';

function Member() {

  return (
    <>
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/verify' element={<MemberVerify/>}/>
          <Route path="/data" element={<MemberData/>}/>
          <Route path="/orders" element={<MemberOrders/>}/>
          <Route path="/level" element={<MemberLevel/>}/>
          <Route path="/events" element={<MemberEvents/>}/>
          <Route path="/collections" element={<MemberCollections/>}/>
          <Route path="/recipe" element={<MemberRecipe/>}/>
          <Route path="/profile" element={<MemberProfile/>}/>
        </Routes>
    </>
  );
}

export default Member;
