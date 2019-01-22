using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;
using FinalltechArt.Service.Interfaces;
using FinalltechArt.DB.DBRepository;
using DataTransferObject;
using FinalltechArt.Service.Utilities;
using System.Linq;

namespace FinalltechArt.Service.Services
{
  public class DrugUnitService:IDrugUnitService
    {
        ClinicRepository ClinicRep;
        DrugRepository DrugRep;
        public DrugUnitService(RepositoryContext context) { DrugRep = new DrugRepository(context); ClinicRep = new ClinicRepository(context); }
        public IEnumerable<DrugUnit> GetAll()
        {       
            return DrugRep.GetAll();
        }
        public IEnumerable<DrugUnit> Sort(int SelectedSort)
        {
           return DrugRep.Sort(SelectedSort);

        }
        public void Add(DrugUnit Drug)
        {
            DrugRep.Add(Drug);
            DrugRep.Save();
        }
        public bool Check(string DrugId)
        {
            return DrugRep.Check(DrugId);
        }

        public void CountDrugTypes(DataCountDrugType Variable)
        {
            DrugRep.CountDrugTypes(Variable);

        }

       public void SendDrugs(DataCountDrugType Variable)
        {
            DrugRep.SendDrugs(Variable);
            DrugRep.Save();
        }

        public IEnumerable<Clinic> GetClinics()
        {

            return ClinicRep.GetAll();
        }

    }
}
