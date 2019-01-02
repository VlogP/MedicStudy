using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using FinalltechArt.DB.Models;
namespace FinalltechArt.DB.DBRepository
{
    public class RepositoryContext: DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Clinic> Clinics { get; set; }
        public DbSet<DrugType> DrugTypes { get; set; }
        public DbSet<DrugUnit> DrugUnits { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Visit> Visits { get; set; }
    }
}
