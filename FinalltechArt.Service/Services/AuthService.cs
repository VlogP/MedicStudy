using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;
using FinalltechArt.Service.Interfaces;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.Service.Utilities;

namespace FinalltechArt.Service.Services
{
    public class AuthService : IAuthService
    {
        UserRepository UserRep;
        public AuthService(RepositoryContext context) { UserRep = new UserRepository(context); }
        public User GetIdentity(string email, string paswword) {

            User AuthUser = UserRep.FindUser(email);
            if (AuthUser != null)
                if (!SaltHash.Verify(AuthUser.Sault, AuthUser.Password, paswword)) return null;
          
            return AuthUser;

        }


        
    }
}
