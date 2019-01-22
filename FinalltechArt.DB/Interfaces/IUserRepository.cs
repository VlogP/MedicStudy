using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;

namespace FinalltechArt.DB.Interfaces
{
   public interface IUserRepository:IBaseRepository<User>
    {
         
         bool isEmailUniq(string email);
         User FindUserByEmail(string email);
         User FindUserById(int Id);
    }
}
