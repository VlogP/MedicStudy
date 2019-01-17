using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;

namespace FinalltechArt.Service.Interfaces
{
    public interface IAuthService
    {
         User GetIdentity(string email, string password);
    }
}
