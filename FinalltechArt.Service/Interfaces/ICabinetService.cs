using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;
using DataTransferObject;

namespace FinalltechArt.Service.Interfaces
{
   public interface ICabinetService
    {
        void Update(UserDTO user,int Id);
        void Update(String Password, int Id);
        User GetCurrentData(int Id);

    }
}
