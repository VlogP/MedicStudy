using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;
namespace FinalltechArt.Service.Interfaces
{
   public interface IRegisterService
    {
        bool CheckEmail(string Email);
        void AddNewUser(User user);
    }
}
