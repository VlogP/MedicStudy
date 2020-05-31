using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;
using FinalltechArt.Service.Interfaces;
using FinalltechArt.DB.DBRepository;
using DataTransferObject;
using FinalltechArt.Service.Utilities;


namespace FinalltechArt.Service.Services
{
   public class CabinetService:ICabinetService
    {
        UserRepository UserRep;
        public CabinetService(RepositoryContext context) { UserRep = new UserRepository(context); }

        public void Update(UserDTO user,int Id)
        {
           User UpdateUser= UserRep.FindUserById(Id);
            UpdateUser.Firstname= user.Firstname;
            UpdateUser.Lastname= user.Lastname;
            UpdateUser.Initials= user.Initials;
            UserRep.Save();
        }

        public void Update(String Password, int Id)
        {
            User UpdateUser = UserRep.FindUserById(Id);
            SaltHash NewPassword = new SaltHash(Password);
            UpdateUser.Password = NewPassword.Hash;
            UpdateUser.Sault = NewPassword.Salt;
            UserRep.Save();
        }

        public User GetCurrentData(int Id)
        {
            return UserRep.FindUserById(Id);

            
        }
    }
}
