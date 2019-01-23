using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.DB.Interfaces;
using System.Linq;
using DataTransferObject;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

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
                    if(drugitem.DrugUnit!=null)
                    ListDrugs +=drugitem.DrugUnit.Name+",";
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
        public bool Check(string IdPatient)
        {

            var patient = basecontext.Patients.FirstOrDefault(x => x.PatientId == IdPatient);

            return patient==null;

        }
        public Patient CheckStatus(string IdPatient)
        {

            var patient = basecontext.Patients.FirstOrDefault(x => x.PatientId == IdPatient);

            return patient;

        }

        public PatientDTO GetFullInfoOne(string Id)
        {

            PatientDTO patient = basecontext.Patients.Where(x => x.PatientId == Id).Select(x=>new PatientDTO
            {
                BirthDate = x.BirthDate,
                Firstname = x.Firstname,
                Gender = x.Gender,
                Lastname = x.Lastname,
                Status = x.Status,
                VisitDTO = new List<VisitDTOInfoViewOne>()
            }).FirstOrDefault();


            if (patient != null)
            {
                patient.VisitDTO = basecontext.Visits.Where(v=>v.PatientId==Id).Join(basecontext.DrugUnits, v => v.VisitId, d => d.VisitId, (v, d) => new VisitDTOInfoViewOne
                {
                    VisitDate = v.VisitDate,
                    DrugUnit = new DrugDTOInfoViewOne
                    {
                        Name = d.Name,
                        Capacity = d.Capacity,
                        Description = d.Description,
                        DrugType = d.DrugType,
                        Manufacturer = d.Manufacturer,
                        TypeCapacity = d.TypeCapacity
                    }
                }).ToList();
            }

            return patient;

        }



    }
}
