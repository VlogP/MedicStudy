using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using FinalltechArt.DB.Models;
using FinalltechArt.DB.Interfaces;
using System.Data.SqlTypes;
using DataTransferObject;

namespace FinalltechArt.DB.DBRepository
{
   public class DrugRepository : BaseRepository<DrugUnit>, IDrugRepository
    {

        public DrugRepository(RepositoryContext context) : base(context) { }
        public IEnumerable<DrugUnit> Sort(int SelectedSort)
        {
            IEnumerable<DrugUnit> Sorted;
            switch (SelectedSort)
            {               
                case 1:
                    Sorted=basecontext.DrugUnits.OrderBy(x =>x.DrugUnitId);
                    break;
                case 2:
                    Sorted= basecontext.DrugUnits.OrderBy(x => x.Description);
                    break;
                case 3:
                    Sorted= basecontext.DrugUnits.OrderBy(x => x.Capacity);
                    break;
                case 4:
                    Sorted=basecontext.DrugUnits.OrderBy(x => x.TypeCapacity);
                    break;
                case 5:
                    Sorted=basecontext.DrugUnits.OrderBy(x => x.DrugType);
                    break;
                case 6:
                    Sorted=basecontext.DrugUnits.OrderBy(x => x.ClinicId);
                    break;
                case 7:
                    Sorted = basecontext.DrugUnits.OrderBy(x => x.Name);
                    break;
                case 8:
                    Sorted = basecontext.DrugUnits.OrderBy(x => x.Manufacturer);
                    break;
                default:
                    Sorted = basecontext.DrugUnits.ToList();
                    break;
            }

            return Sorted;

        }
       

        public void CountDrugTypes(DataCountDrugType Variable)
        {
            Variable.CountTypeA = basecontext.DrugUnits.Where(x => x.DrugType == "A").Where(x=>x.ClinicId==null).Count();
            Variable.CountTypeB = basecontext.DrugUnits.Where(x => x.DrugType == "B").Where(x => x.ClinicId == null).Count();
            Variable.CountTypeC = basecontext.DrugUnits.Where(x => x.DrugType == "C").Where(x => x.ClinicId == null).Count();
        }
        public void CountDrugTypesInClinic(DataCountDrugType Variable)
        {
            Variable.CountTypeA = basecontext.DrugUnits.Where(x => x.DrugType == "A"&&x.VisitId==null).Where(x => x.ClinicId == Variable.ClinicId).Count();
            Variable.CountTypeB = basecontext.DrugUnits.Where(x => x.DrugType == "B"&& x.VisitId == null).Where(x => x.ClinicId == Variable.ClinicId).Count();
            Variable.CountTypeC = basecontext.DrugUnits.Where(x => x.DrugType == "C"&& x.VisitId == null).Where(x => x.ClinicId == Variable.ClinicId).Count();
            
        }

        public bool Check(string DrugId)
        {

            var element = basecontext.DrugUnits.FirstOrDefault(x => x.DrugUnitId == DrugId);
                  
            return element == null;
        }
        public void Delete(string DrugId)
        {

            var element = basecontext.DrugUnits.FirstOrDefault(x => x.DrugUnitId == DrugId);
            
            basecontext.DrugUnits.Remove(element);
            
        }
        public void SendDrugs(DataCountDrugType Variable)
        {
            
            IEnumerable<DrugUnit>MyUnits= basecontext.DrugUnits.Where(x => x.DrugType == "A").Take(Variable.CountTypeA).ToList();
            foreach (var item in MyUnits)
                item.ClinicId = Variable.ClinicId;
            MyUnits=basecontext.DrugUnits.Where(x => x.DrugType == "B" ).Take(Variable.CountTypeB).ToList();
            foreach (var item in MyUnits)
                item.ClinicId = Variable.ClinicId;
            MyUnits=basecontext.DrugUnits.Where(x => x.DrugType == "C" ).Take(Variable.CountTypeC).ToList();
            foreach (var item in MyUnits)
                item.ClinicId = Variable.ClinicId;

          
        }

       public void TakeDrugToVisit(DataCountDrugType Variable,int VisitId)
        {
            IEnumerable<DrugUnit> MyUnits = basecontext.DrugUnits.Where(x => x.DrugType == "A"&&x.VisitId==null).ToList();

          
            if(Variable.CountTypeA!=0)
                   MyUnits.ElementAt(new Random().Next(0, MyUnits.Count())).VisitId=VisitId;    
          
            MyUnits = basecontext.DrugUnits.Where(x => x.DrugType == "B" && x.VisitId == null).ToList();
          
            if (Variable.CountTypeB != 0)
                MyUnits.ElementAt(new Random().Next(0, MyUnits.Count())).VisitId = VisitId;

            MyUnits = basecontext.DrugUnits.Where(x => x.DrugType == "C" && x.VisitId == null).ToList();

            if (Variable.CountTypeC != 0)
                MyUnits.ElementAt(new Random().Next(0, MyUnits.Count())).VisitId = VisitId;
        }


    }
}
