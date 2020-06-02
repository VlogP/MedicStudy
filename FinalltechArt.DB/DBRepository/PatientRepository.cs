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
                var clinicName = basecontext.Clinics.ToList().FirstOrDefault(_ => _.ClinicId.Equals(item.ClinicId)).Name;
             
                ListDrugs = ListDrugs.Length != 0 ? ListDrugs.Remove(ListDrugs.Count()-1) : "";
              
                patienttable.Add(new PatientTableViewDTO { Status = item.Status,ClinicName = clinicName,BirthDate= item.BirthDate,ClinicId=item.ClinicId,PatientId=item.PatientId,VisitLast=Lastvisit,UsedDrugs=ListDrugs,PatientFirstname = item.Firstname,PatientLastname = item.Lastname }) ;
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
                var clinicName = basecontext.Clinics.ToList().FirstOrDefault(_ => _.ClinicId.Equals(item.ClinicId)).Name;

                ListDrugs = ListDrugs.Length != 0 ? ListDrugs.Remove(ListDrugs.Count() - 1) : "";

                patienttable.Add(new PatientTableViewDTO { Status = item.Status,ClinicName = clinicName, BirthDate = item.BirthDate, ClinicId = item.ClinicId, PatientId = item.PatientId, VisitLast = Lastvisit, UsedDrugs = ListDrugs, PatientFirstname = item.Firstname, PatientLastname = item.Lastname });
            }

            return patienttable;

        }
        public bool Check(int IdPatient)
        {

            var patient = basecontext.Patients.FirstOrDefault(x => x.PatientId == IdPatient);

            return patient==null;

        }
        public Patient CheckStatus(int IdPatient)
        {

            var patient = basecontext.Patients.FirstOrDefault(x => x.PatientId == IdPatient);

            return patient;

        }

        public PatientDTO GetFullInfoOne(int Id)
        {

            PatientDTO patient = basecontext.Patients.Where(x => x.PatientId == Id).Select(x=>new PatientDTO
            {
                BirthDate = x.BirthDate,
                Firstname = x.Firstname,
                Gender = x.Gender,
                Lastname = x.Lastname,
                Status = x.Status,
                IllnesId = x.IllnesId.Value,
                VisitDTO = new List<VisitDTOInfoViewOne>()
            }).FirstOrDefault();


            if (patient != null)
            {
                var visits = basecontext.Visits.Where(v => v.PatientId == Id).ToList();

                patient.VisitDTO = visits.Select(item => new VisitDTOInfoViewOne
                {
                    VisitDate = item.VisitDate,
                    DrugUnit = basecontext.DrugUnits.FirstOrDefault(drug => drug.VisitId == item.VisitId) != null ? new DrugDTOInfoViewOne { 
                       Name = basecontext.DrugUnits.FirstOrDefault(drug => drug.VisitId == item.VisitId)?.Name,
                       Capacity = basecontext.DrugUnits.FirstOrDefault(drug => drug.VisitId == item.VisitId)?.Capacity,
                       Description = basecontext.DrugUnits.FirstOrDefault(drug => drug.VisitId == item.VisitId)?.Description,
                       DrugType = basecontext.DrugUnits.FirstOrDefault(drug => drug.VisitId == item.VisitId)?.DrugType,
                       Manufacturer = basecontext.DrugUnits.FirstOrDefault(drug => drug.VisitId == item.VisitId)?.Manufacturer,
                    } : null
                }).ToList();
                
            }

            return patient;

        }



    }
}
