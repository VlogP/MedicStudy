using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using FinalltechArt.DB.Models;
using DataTransferObject;

namespace FinalltechArt.DB.Interfaces
{
   public interface IDrugRepository:IBaseRepository<DrugUnit>
    {
        IEnumerable<DrugUnit> Sort(int SelectedSort);
        bool Check(string DrugId);
        void CountDrugTypes(DataCountDrugType Variable);
        void CountDrugTypesInClinic(DataCountDrugType Variable);
        void SendDrugs(DataCountDrugType Variable);
        void TakeDrugToVisit(DataCountDrugType Variable, int VisitId);
    }
}
