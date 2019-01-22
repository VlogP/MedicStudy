using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using FinalltechArt.DB.Models;
using DataTransferObject;
namespace FinalltechArt.Service.Interfaces
{
   public interface IDrugUnitService
    {
        IEnumerable<DrugUnit> GetAll();
        IEnumerable<DrugUnit> Sort(int SelectedSort);
        void Add(DrugUnit Drug);
        bool Check(string DrugId);
        void CountDrugTypes(DataCountDrugType Variable);
        void SendDrugs(DataCountDrugType Variable);
        IEnumerable<Clinic> GetClinics();
    }
}
