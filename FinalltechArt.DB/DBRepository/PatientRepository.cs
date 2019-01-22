using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.DB.Interfaces;
using System.Linq;
using DataTransferObject;
using Microsoft.EntityFrameworkCore;


namespace FinalltechArt.DB.DBRepository
{
    public class PatientRepository:BaseRepository<Patient>,IPatientRepository
    {
        public PatientRepository(RepositoryContext context):base(context) { }

        public IEnumerable<PatientTableViewDTO> GetAllSponsor()
        {

           List<PatientTableViewDTO> patienttable=new List<PatientTableViewDTO>();

            var  x1 = basecontext.Patients.Include(x=>x.Visits).ThenInclude(c=>c.DrugUnit).ToList();
            foreach(var item in x1)
            {
                string ListDrugs="";
                foreach(var drugitem in item.Visits)
                {                   
                    ListDrugs +=drugitem.DrugUnit?.Name+",";
                }
                string Lastvisit = item.Visits.LastOrDefault()?.VisitDate;
             
                ListDrugs =ListDrugs.Remove(ListDrugs.Count()-1);
              
                patienttable.Add(new PatientTableViewDTO {BirthDate= item.BirthDate,ClinicId=item.ClinicId,PatientId=item.PatientId,VisitLast=Lastvisit,UsedDrugs=ListDrugs }) ;
            }
     
            return patienttable;
        }
        public IEnumerable<PatientTableViewDTO> GetAllResearcher(string IdClinic)
        {

            List<PatientTableViewDTO> patienttable = new List<PatientTableViewDTO>();

            var x1 = basecontext.Patients.Where(x=>x.ClinicId==IdClinic).Include(x => x.Visits).ThenInclude(c => c.DrugUnit).ToList();

            foreach (var item in x1)
            {
                string ListDrugs = "";
                foreach (var drugitem in item.Visits)
                {
                    ListDrugs += drugitem.DrugUnit?.Name + ",";
                }
                string Lastvisit = item.Visits.LastOrDefault()?.VisitDate;

                ListDrugs = ListDrugs.Remove(ListDrugs.Count() - 1);

                patienttable.Add(new PatientTableViewDTO { BirthDate = item.BirthDate, ClinicId = item.ClinicId, PatientId = item.PatientId, VisitLast = Lastvisit, UsedDrugs = ListDrugs });
            }

            return patienttable;

        }
       


    }
}
