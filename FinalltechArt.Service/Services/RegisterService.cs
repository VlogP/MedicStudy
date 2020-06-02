using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;
using FinalltechArt.Service.Interfaces;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.Service.Utilities;


namespace FinalltechArt.Service.Services
{
   public class RegisterService:IRegisterService
    {
        UserRepository UserRep;
        public RegisterService(RepositoryContext context)  { UserRep = new UserRepository(context); }

        public bool CheckEmail(string Email) {
         return UserRep.isEmailUniq(Email);
        }

        public void AddNewUser(User user) {
            user.Role = 1;
            SaltHash saltHash = new SaltHash(user.Password);
            user.Sault = saltHash.Salt;
            user.Password = saltHash.Hash;
            user.ClinicId = "1";
            UserRep.Add(user);UserRep.Save();
        }



    }
}
